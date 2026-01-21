import { ContentNotFound } from "@/components/ContentNotFound";

export default function NotFound() {
    return (
      <main style={{ padding: '4rem', textAlign: 'center' }}>
        <ContentNotFound
          title="Page Not Found"
          message="We couldn't find the page you were looking for."
        />
      </main>
    );
  }
  