import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function POST({ request }) {
	const data = await request.json();
	const { name, email, message } = data;

	try {
		await resend.emails.send({
			from: 'Contact Form <iam@thethird.dev>',
			to: 'iam@thethird.dev',
			subject: `New Contact Form Submission from ${name} via thethird.dev`,
			reply_to: email,
			html: `<p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/>${message}</p>`,
		});
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (e) {
		return new Response(
			JSON.stringify({ success: false, error: e.message }),
			{ status: 500 },
		);
	}
}
