"use client";

export default function ClientMeta({ title, description }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}
