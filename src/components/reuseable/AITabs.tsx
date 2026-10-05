import { AiAdapter } from "@/store/api/types/SingleResponse";
import CommonButton from "../common/button/CommonButton";
import CommonSelect from "../common/custom/CommonSelect";

interface AITabsProps {
  setActiveAdapter: (adapter: AiAdapter) => void;
  activeAdapter: AiAdapter;
  setIsSummaryOpen: (isOpen: boolean) => void;
}

const adapters: AiAdapter[] = ["gemini", "openai", "claude", "perplexity"];

const selectItems = adapters.map((adapter) => ({
  label: adapter,
  value: adapter,
}));

const AITabs: React.FC<AITabsProps> = ({
  setActiveAdapter,
  activeAdapter,
  setIsSummaryOpen,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="hidden sm:flex lg:gap-2">
        {adapters.map((adapter) => (
          <CommonButton
            key={adapter}
            className={`capitalize ! ${
              adapter === activeAdapter ? "bg-[#22C55E]!" : "bg-black!"
            }`}
            onClick={() => setActiveAdapter(adapter)}
          >
            {adapter}
          </CommonButton>
        ))}
      </div>

      <div className="sm:hidden">
        <CommonSelect
          value={activeAdapter}
          item={selectItems}
          w={140}
          onValueChange={(val) => setActiveAdapter(val as AiAdapter)}
          className="
          "
        />
      </div>

      <CommonButton
        onClick={() => setIsSummaryOpen(false)}
        className="bg-blue-600"
      >
        Summary
      </CommonButton>
    </div>
  );
};

export default AITabs;
