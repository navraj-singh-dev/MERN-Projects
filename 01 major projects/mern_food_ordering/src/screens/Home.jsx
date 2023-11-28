import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:8080/api/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {/* navbar */}
      <div>
        <Navbar />
      </div>

      {/* carousel */}
      <div>
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div class="d-flex justify-content-center" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100 image"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1426869981800-95ebf51ce900?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100 image"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="d-block w-100 image"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* cards */}
      {/* each card is fetching data from mongodb */}
      <div className="container">
        {foodCategory !== [] ? (
          foodCategory.map((object_map) => {
            return (
              <div className="row mb-3">
                <div key={object_map._id} className="fs-4 m-3">
                  {object_map.CategoryName}
                  <hr />
                </div>

                {foodItem !== [] ? (
                  foodItem
                    .filter((object_filter) => {
                      return (
                        object_filter.CategoryName ===
                          object_map.CategoryName &&
                        object_filter.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      );
                    })
                    .map((filteredItem) => {
                      return (
                        <div
                          key={filteredItem._id}
                          className="col-12 col-md-6 col-lg-4"
                        >
                          <Card
                            foodItem={filteredItem}
                            options={filteredItem.options[0]}
                            img={filteredItem.img}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No Data Here</div>
                )}
              </div>
            );
          })
        ) : (
          <div>Nhi Hoya</div>
        )}
      </div>

      {/* footer */}
      <div>
        <Footer />
      </div>
    </>
  );
}
