import React, { useState, useEffect } from "react";
import { Card, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Link from "antd/es/typography/Link";

const { Meta } = Card;
const { Title } = Typography;

const weatherData = [
    {
        city: "New York",
        temperature: 22,
        description: "Sunny",
        image: "https://via.placeholder.com/150",
    },
    {
        city: "London",
        temperature: 15,
        description: "Cloudy",
        image: "https://via.placeholder.com/150",
    },
    {
        city: "Paris",
        temperature: 18,
        description: "Rainy",
        image: "https://via.placeholder.com/150",
    },
];

const WeatherCard = ({ city, temperature, description, image, onClose }) => {
    return (
        <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 0, right: 0 }}>
                <CloseOutlined onClick={onClose} />
            </div>
            <Link to="/">
                <Card
                    hoverable
                    style={{ width: 300, margin: 20 }}
                    cover={<img alt={city} src={image} />}
                >
                    <Meta title={city} />
                    <Title level={3}>{temperature}&deg;C</Title>
                    <p>{description}</p>
                </Card>
            </Link>
        </div>
    );
};
const Home = () => {
    const [cities, setCities] = useState(weatherData);

    const handleCardClose = (city) => {
        const newCities = cities.filter((c) => c.city !== city);
        setCities(newCities);
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {cities.map(({ city, temperature, description, image }) => (
                <WeatherCard
                    key={city}
                    city={city}
                    temperature={temperature}
                    description={description}
                    image={image}
                    onClose={() => handleCardClose(city)}
                />
            ))}
        </div>
    );
};

export default Home;
