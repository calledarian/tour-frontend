import '../styles/footer.css';


export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">RambodaTours</h3>
                    <p className="footer-description">
                        Discover the world with our exclusive vacation packages and create memories that last a lifetime.
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Contact Us</h4>
                    <address className="footer-contact">
                        <p>Phone: <a href="tel:+94 712 345 678">+94 712 345 678</a></p>
                        <p>Email: <a href="mailto:info@rambodatours.com">info@rambodatours.com</a></p>
                    </address>
                </div>
            </div>
        </footer>
    );
}