import React, { useState, useEffect } from 'react';
import Filters from '../Components/Filters'
import "../styles/card.css"
import CatalogItems from '../Components/CatalogItems'
import axios from 'axios'
import { Row } from "react-bootstrap"

export default function Catalog(props) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios.get(`/catalog`)
      .then(response => {
        console.log(response.data);
        setItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка загрузки данных:', error);
        setLoading(false);
      });
  }
  useEffect(() => {
    // Загрузка данных при монтировании
    fetchData();

    // Периодический опрос сервера каждые 5 секунд
    const intervalId = setInterval(fetchData, 300000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <title>Каталог</title>
      <div>Catalog</div>
      <Filters />
      <div className="mt-3"></div>
      <Row>
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          Array.isArray(items) && items.length > 0 ? (
            items.map((item) => (
              <CatalogItems key={item.title} title={item.title} price={item.price} productId={item.id} img={item.image} />
            ))
          ) : (
            <p>Загрузка...</p>
          )
        )}
      </Row>
    </>
  );
};
