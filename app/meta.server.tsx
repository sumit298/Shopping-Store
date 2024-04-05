// server-components/Meta.server.js
interface MetaProps {
  title: string;
  description: string;
}

export default function Meta({ title, description }: MetaProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      {/* Add other meta tags as needed */}
    </>
  );
}
