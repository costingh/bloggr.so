// import { createLoopsContact } from "@/lib/utils/loops";
import { addMailChimpListMember } from "@/lib/utils/mailchimp";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();
	const email = body.email;
	if (!email) {
		return NextResponse.json(
			{ error: "Email is required" },
			{ status: HttpStatusCode.BadRequest }
		);
	}

	if (email) {
		try {
			await addMailChimpListMember({
				email,
				firstName: "",
				lastName: "",
				tags: ["waitlits"],
			});
			// await createLoopsContact({
			// 	email,
			// 	firstName: "",
			// 	lastName: "",
			// 	userGroup: "Waitlist",
			// });
		} catch (err) {
			console.error("Error while adding email contact", err);
			return NextResponse.json(
				{ error: "An error occurred" },
				{ status: HttpStatusCode.InternalServerError }
			);
		}
	}

	return Response.json({ result: true });
}
