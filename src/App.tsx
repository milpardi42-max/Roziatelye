import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { PatternsPage } from "@/pages/PatternsPage";
import { PatternDetailPage } from "@/pages/PatternDetailPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { ArtistsPage } from "@/pages/ArtistsPage";
import { ArtistProfilePage } from "@/pages/ArtistProfilePage";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { PortfolioDetailPage } from "@/pages/PortfolioDetailPage";
import { EducationPage } from "@/pages/EducationPage";
import { EducationDetailPage } from "@/pages/EducationDetailPage";
import { StorePage } from "@/pages/StorePage";
import { StoreCategoryPage } from "@/pages/StoreCategoryPage";
import { CartPage } from "@/pages/CartPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { B2BPage } from "@/pages/B2BPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { SearchPage } from "@/pages/SearchPage";
import { AccountPage } from "@/pages/AccountPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="patterns" element={<PatternsPage />} />
          <Route path="patterns/:slug" element={<PatternDetailPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductDetailPage />} />
          <Route path="artists" element={<ArtistsPage />} />
          <Route path="artists/:slug" element={<ArtistProfilePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:slug" element={<PortfolioDetailPage />} />
          <Route path="education" element={<EducationPage />} />
          <Route path="education/:slug" element={<EducationDetailPage />} />
          <Route path="store" element={<StorePage />} />
          <Route path="store/category/:slug" element={<StoreCategoryPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="b2b" element={<B2BPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
