"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import styles from "./pyramid.module.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type PyramidProps = {
  /** 위에 표시할 제목 */
  title?: string;
  /** 위(꼭대기)에서 아래(바닥) 순서의 단계 이름 */
  levels?: string[];
  /** 처음에 강조할 단계의 번호 (0부터 시작) */
  defaultActiveIndex?: number;
};

const MASLOW_LEVELS = [
  "Self Actualisation",
  "Esteem",
  "Love Belonging",
  "Safety",
  "Physiological",
];

export default function Pyramid({
  title = "Maslow Pyramid",
  levels = MASLOW_LEVELS,
  defaultActiveIndex = 1,
}: PyramidProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  return (
    <section className={`${styles.root} ${poppins.className}`}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>
        <div className={styles.triangle} aria-hidden="true" />
        <ul className={styles.list}>
          {levels.map((level, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={level}
                className={`${styles.item} ${isActive ? styles.active : ""}`}
              >
                <button
                  type="button"
                  className={styles.button}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                >
                  {level}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
