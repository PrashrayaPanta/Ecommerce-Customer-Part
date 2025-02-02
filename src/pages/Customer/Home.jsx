import React, { useEffect, useState } from "react";
import { Carousel, CarouselItem } from "react-bootstrap";

import { ProductSection } from "../../components";
import http from "../../http";
import { imgURL } from "../../library";
import { LoadingComponent } from "../../components";
import CarouselComponent from "../../components/CarouselComponent";

const Home = () => {
  const [featured, setFeatured] = useState([]);

  const [loading, setLoading] = useState(true);

  const [latestProduct, setLatestProduct] = useState([]);

  const [topsellingProduct, settopsellingProduct] = useState([]);

  useEffect(() => {
    setLoading(true);
    http
      .get("/products/featured")
      .then(({ data }) => {
        setFeatured(data);
        return http.get("/products/latest");
      })
      .then(({ data }) => {
        setLatestProduct(data);
        return http.get("/products/top-selling");
      })
      .then(({ data }) => settopsellingProduct(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div class="col-12">
      <main class="row">
        <div class="col-12 px-0 bg-primary" >
            <CarouselComponent/>
        </div>

        <ProductSection
          title="Featured Product"
          products={featured.slice(0, 4)}
          loading={loading}
        />
        <div class="col-12">
          <hr />
        </div>

        <ProductSection
          title="Latest Product"
          products={latestProduct.slice(0, 4)}
          loading={loading}
        />

        <div class="col-12">
          <hr />
        </div>

        <ProductSection
          title="Top Selling Product"
          products={topsellingProduct.slice(0, 4)}
          loading={loading}
        />

        <div class="col-12 py-3 bg-light d-sm-block d-none">
          <div class="row">
            <div class="col-lg-3 col ms-auto large-holder">
              <div class="row">
                <div class="col-auto ms-auto large-icon">
                  <i class="fas fa-money-bill"></i>
                </div>
                <div class="col-auto me-auto large-text">Best Price</div>
              </div>
            </div>
            <div class="col-lg-3 col large-holder">
              <div class="row">
                <div class="col-auto ms-auto large-icon">
                  <i class="fas fa-truck-moving"></i>
                </div>
                <div class="col-auto me-auto large-text">Fast Delivery</div>
              </div>
            </div>
            <div class="col-lg-3 col me-auto large-holder">
              <div class="row">
                <div class="col-auto ms-auto large-icon">
                  <i class="fas fa-check"></i>
                </div>
                <div class="col-auto me-auto large-text">Genuine Products</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
