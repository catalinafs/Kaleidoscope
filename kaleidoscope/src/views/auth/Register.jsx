// React
import { useEffect } from "react";

// Custom Components
import Layout from "../../components/layouts";

const Register = () => {
    useEffect(() => {
        document.title = "Register | Kaleidoscope";
    }, []);

    return (
        <Layout>
            register
        </Layout>
    );
}

export default Register;
