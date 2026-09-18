"use client";

import Image from "next/image";
import styles from "./DemoInvitation.module.css";

type DemoInvitationProps = {
  open: boolean;
  onOpen: () => void;
  controls: string;
  id: string;
};

export default function DemoInvitation({
  open,
  onOpen,
  controls,
  id,
}: DemoInvitationProps) {
  return (
    <button
      id={id}
      type="button"
      className={styles.button}
      aria-expanded={open}
      aria-controls={controls}
      aria-haspopup="dialog"
      onClick={onOpen}
    >
      <span className={styles.avatar} aria-hidden="true">
        <Image
          src="/avatars/sprout.png"
          alt=""
          width={52}
          height={52}
          sizes="52px"
        />
      </span>
      <span className={styles.copy}>
        <span className={styles.invitation}>
          Click me to see the work
          <svg
            className={styles.play}
            viewBox="0 0 12 12"
            width="12"
            height="12"
            aria-hidden="true"
          >
            <path d="M3.7 2.4a.7.7 0 0 1 1.08-.59l4.42 3.6a.75.75 0 0 1 0 1.18l-4.42 3.6A.7.7 0 0 1 3.7 9.6V2.4Z" />
          </svg>
        </span>
        <span className={styles.detail}>Interactive demos</span>
      </span>
    </button>
  );
}
