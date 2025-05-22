import PackageDetails from "./packageDetails";
import "../styles/home.css";

export default function Home() {

    return (
        <div className="home-container">
            <h1>Welcome to Tour Explorer</h1>
            <p>Discover amazing travel packages and plan your next adventure with us!</p>
            <div className="featured-packages">
                <h2>Featured Packages</h2>
                <PackageDetails />
            </div>
            <div className="why-choose-us">
                <h2>Why Choose Us?</h2>
                <ul>
                    <li>Handpicked destinations</li>
                    <li>Best price guarantee</li>
                    <li>24/7 customer support</li>
                </ul>
            </div>
            <div className="newsletter-signup">
                <h2>Stay Updated!</h2>
                <p>Subscribe to our newsletter for the latest deals and updates.</p>
                <form>
                    <input type="email" placeholder="Enter your email" />
                    <button type="submit">Subscribe</button>
                </form>
            </div>
        </div>
    );
}
