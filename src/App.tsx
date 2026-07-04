import { Toaster } from "react-hot-toast";
import "./App.css";
import { BundleLayout } from "@/components/layout/BundleLayout";
import { BuilderSection } from "@/components/layout/BuilderSection";
import { ReviewPlaceholder } from "@/components/review/ReviewPlaceholder";

function App() {
  return (
    <>
      <BundleLayout
        builder={<BuilderSection />}
        sidebar={<ReviewPlaceholder />}
      />
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
