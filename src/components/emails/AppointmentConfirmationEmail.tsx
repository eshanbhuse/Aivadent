import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Link,
    Img
} from "@react-email/components";

interface AppointmentConfirmationEmailProps {
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    appointmentType: string;
    duration: string;
    price: string;
}
function AppointmentConfirmationEmail({
    doctorName,
    appointmentDate,
    appointmentTime,
    appointmentType,
    duration,
    price,
}: AppointmentConfirmationEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Your appointment is confirmed!</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logoContainer}>
                        <Img src="https://i.ibb.co.com/tRy6cC2/logo.png" alt="AIVADENT Logo" width="50" height="50" style={logo} />
                        <Text style={logoText}>AIVADENT</Text>
                    </Section>
                    <Heading style={h1}>Appointment Confirmation 🦷</Heading>
                    <Text style={text}>
                        Dear Patient,
                    </Text>
                    <Text style={text}>
                        We are pleased to confirm your appointment with Dr. {doctorName}. Here are the details of your appointment:
                    </Text>
                    <Section style={appointmentDetails}>
                        <Text style={detailLabel}>Doctor</Text>
                        <Text style={detailValue}>{doctorName}</Text>

                        <Text style={detailLabel}>Appointment Type</Text>
                        <Text style={detailValue}>{appointmentType}</Text>

                        <Text style={detailLabel}>Date</Text>
                        <Text style={detailValue}>{appointmentDate}</Text>

                        <Text style={detailLabel}>Time</Text>
                        <Text style={detailValue}>{appointmentTime}</Text>

                        <Text style={detailLabel}>Duration</Text>
                        <Text style={detailValue}>{duration}</Text>

                        <Text style={detailLabel}>Cost</Text>
                        <Text style={detailValue}>{price}</Text>

                        <Text style={detailLabel}>Location</Text>
                        <Text style={detailValue}>Dental Centre</Text>

                        </Section>
                    <Text style={text}>
                        If you have any questions or need to reschedule, please don't hesitate to contact us.
                    </Text>
                    <Section style={buttonContainer}>
                        <Link style={button} href={process.env.NEXT_PUBLIC_APP_URL + "/appointments"}>
                            Visit My Appointments
                        </Link>
                    </Section>
                    <Text style={footer}>
                        Best regards,<br />
                        The AIVADENT Team
                    </Text>
                    <Text style={footerText}>
                        &copy; {new Date().getFullYear()} AIVADENT. All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}
export default AppointmentConfirmationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const logoContainer = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const logo = {
  borderRadius: "8px",
  display: "inline",
  verticalAlign: "middle",
};

const logoText = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#2563eb",
  margin: "0",
  display: "inline",
  marginLeft: "12px",
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const text = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const appointmentDetails = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0",
};

const detailLabel = {
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "500",
  margin: "8px 0 4px 0",
};

const detailValue = {
  color: "#1f2937",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 16px 0",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const footer = {
  color: "#374151",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "32px 0 16px 0",
};

const footerText = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0 0 0",
  textAlign: "center" as const,
};
