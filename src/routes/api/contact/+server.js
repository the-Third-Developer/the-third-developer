import { Resend } from 'resend';

export async function POST({ request }) {
	const data = await request.json();
	const { name, email, message } = data;

	// Only access the env var here, at runtime
	const apiKey = import.meta.env.RESEND_API_KEY;
	if (!apiKey) {
		return new Response(
			JSON.stringify({ success: false, error: 'Missing RESEND_API_KEY' }),
			{ status: 500 },
		);
	}
	const resend = new Resend(apiKey);

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
