import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import StatsGrid from "../components/dashboard/stats-grid";

import AddCustomWordDialog from "../components/dashboard/add-word-dialog";
import WordOfTheDay from "../components/dashboard/word-of-the-day";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="mt-32 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your vocabulary learning progress
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="en">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
            <AddCustomWordDialog />
          </div>
        </div>

        <StatsGrid />
        <WordOfTheDay />
      </div>
    </div>
  );
}
