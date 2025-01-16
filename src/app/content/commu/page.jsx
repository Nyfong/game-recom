import SocialCard from "@/components/commuStuff/Card/crudCard/SocailCard";
import CommunityContent from "@/components/commuStuff/Card/crudCard/SocailCard";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

// ./src/app/content/commu/page.jsx
export default function CommunityPage() {
  return (
    <ErrorBoundary>
      {" "}
      <SocialCard />{" "}
    </ErrorBoundary>
  );
}

// ./src/components/CommunityContent.jsx
