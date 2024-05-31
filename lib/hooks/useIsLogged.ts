import { useSession } from "next-auth/react";

export const useIsLogged = () => {
	const { data: session, status } = useSession();


	const isLoading = status === "loading";
	const isLogged = status === "authenticated";

	return {
		isLoading,
		isLogged,
		user: session?.user || null,
	};
};
