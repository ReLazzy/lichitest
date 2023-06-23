import React from 'react';
import style from './CardItem.module.scss';
import { Product } from '@/pages';

export const CardItem = (props: Product) => {
  const { id, name, brand, price, colors, photos } = props;

  return (
    <div className={style.item}>
      <img src={photos['384_512']} alt="clothes" />

      <div className={style.text}>{name}</div>
      <div className={style.text}>{price}</div>
      <div style={{ display: 'flex', gap: '5px' }}>
        {colors.map((value, x) => (
          <div
            key={value + x}
            className={style.color}
            style={{
              backgroundColor: '#' + value,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
