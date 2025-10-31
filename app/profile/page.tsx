import { ProfileContent } from "@/components/profile/ProfileContent";
import {
  addCardToUser,
  getCardsByUser,
  removeCardFromUser,
  bestUserCardsByCategory,
} from "@/lib/actions/profile.actions";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import {
  buildBestCardRecommendations,
  type ProfileDataSnapshot,
} from "@/lib/profile/utils";
import { redirect } from "next/navigation";

const composeProfileSnapshot = async (
  userId: string
): Promise<ProfileDataSnapshot> => {
  const [{ data: cards }, bestCards] = await Promise.all([
    getCardsByUser(userId),
    bestUserCardsByCategory(userId),
  ]);

  return {
    cards,
    bestCardsByCategory: buildBestCardRecommendations(bestCards ?? {}),
  };
};

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  if (error || !user) {
    redirect("/login");
  }

  const initialSnapshot = await composeProfileSnapshot(user.id);

  const refreshProfileAction = async (): Promise<ProfileDataSnapshot> => {
    "use server";
    return composeProfileSnapshot(user.id);
  };

  const addCardAction = async (
    cardId: string
  ): Promise<ProfileDataSnapshot> => {
    "use server";
    await addCardToUser(user.id, cardId);
    revalidatePath("/profile");
    return composeProfileSnapshot(user.id);
  };

  const removeCardAction = async (
    cardId: string
  ): Promise<ProfileDataSnapshot> => {
    "use server";
    await removeCardFromUser(user.id, cardId);
    revalidatePath("/profile");
    return composeProfileSnapshot(user.id);
  };

  const handleSignOut = async (): Promise<void> => {
    "use server";
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      redirect("/error");
    }

    redirect("/");
  };

  return (
    <ProfileContent
      userId={user.id}
      initialSnapshot={initialSnapshot}
      refreshProfile={refreshProfileAction}
      addCardToProfile={addCardAction}
      removeCardFromProfile={removeCardAction}
      handleSignOut={handleSignOut}
    />
  );
}
