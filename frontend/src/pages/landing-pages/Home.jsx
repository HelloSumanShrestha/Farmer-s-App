import '../../App.css';
import Swipe from '../../components/Swipe';
import { GiFruitBowl, GiCarrot, GiMeat, GiFrozenOrb } from "react-icons/gi";
import { FaWineBottle } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Testimonials from "../landing-pages/Testimonials"
import Products from '../../components/Products';
import PopularCategories from '../../components/PopularCategories';
import OurTeam from "./OurTeam"
import Footer from "./Footer"

function Home() {
    return (
        <>
            <div className="category-banner">
                <Swipe />
                <div className="category">
                    <h2>Categories</h2>
                    <ul>
                        <li>
                            <Link to="/categories/fruits">
                                <GiFruitBowl /> Fruits
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories/vegetables">
                                <GiCarrot /> Vegetables
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories/frozen">
                                <GiFrozenOrb /> Frozen Items
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories/meat">
                                <GiMeat /> Meat Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories/dairy">
                                <FaWineBottle /> Dairy Products
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <PopularCategories />
            <Products />
            <OurTeam />
            <Testimonials/>
            <Footer/>
        </>
    );
}

export default Home;
