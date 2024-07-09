import { Separator } from "@/components/ui/separator";
import Header from "../(components)/Header";
import Chart from "./components/Chart";
import CircularProgressBar from "./components/CircularProgressBar";
import Stats from "./components/Stats";
import Tabs from "./components/Tabs";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <Header description="Overview of your store" title="Analytics" />
      <Separator className="mt-2 mb-0" />
      <div>
        <h3 className="mb-2 text-muted-foreground ">Overview of this month</h3>
        <Stats />
      </div>
      {/* <CircularProgressBar number={66} /> */}
      <div>
        <h3 className="mb-2 text-muted-foreground ">Chart </h3>

        <Chart />
      </div>
    </div>
  );
};

export default Analytics;
