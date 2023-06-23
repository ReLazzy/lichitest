import { CardItem } from '@/src/components';
import { DEFAULT_PARAMS } from '@/src/constants';
import $api from '@/src/http';

import { VirualizedList } from 'plovvirtualized';
import { useEffect, useState } from 'react';
import global from '@/styles/global.module.scss';
export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  photos: {
    '384_512': string;
    '768_1024': string;
  };
  colors: string[];
}

export default function Home() {
  const array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const [page, setPage] = useState<number>(1);
  const [product, setProduct] = useState<Product[]>([]);
  const [data, setData] = useState<any[]>();
  const [isEndScroll, setIsEndScroll] = useState<boolean>(false);
  const [isEndPosts, setIsEndPosts] = useState<boolean>(false);
  useEffect(() => {
    const getList = async () => {
      try {
        const params = { ...DEFAULT_PARAMS, page: page };
        const res = await $api.post(
          'category/get_category_product_list',
          params
        );
        setData(res.data.api_data.aProduct);

        setIsEndScroll(false);
      } catch (error) {}
    };
    getList();
  }, [page]);

  useEffect(() => {
    if (isEndScroll && !isEndPosts) {
      setPage(page + 1);
    }
  }, [isEndScroll]);

  useEffect(() => {
    if (data) {
      if (data.length === 0) {
        setIsEndPosts(true);
        return;
      }
      const products: Product[] = data.map((element: any) => {
        const otherColors =
          element.colors.other?.map((color: any) => color.value) || [];

        return {
          id: element.id,
          brand: element.brand_name,
          name: element.name,
          price: element.price,
          photos: element.photos[0].thumbs,
          colors: [element.colors.current.value, ...otherColors],
        };
      });

      setProduct([...product, ...products]);
    }
  }, [data]);

  return (
    <div style={{ display: 'flex' }}>
      <VirualizedList
        className={global.container}
        data={product}
        containerHeight={'100vh'}
        itemHeight={600}
        setIsEnd={setIsEndScroll}
        renderer={(elem: Product) => (
          <CardItem
            key={elem.id}
            id={elem.id}
            brand={elem.brand}
            name={elem.name}
            price={elem.price}
            photos={elem.photos}
            colors={elem.colors}
          ></CardItem>
        )}
      ></VirualizedList>
    </div>
  );
}
