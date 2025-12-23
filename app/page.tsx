import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
   <div className="flex h-screen flex-col items-center justify-center">
    <Button variant="destructive">Click me</Button>
    <Input placeholder="Enter your name" />
   </div>
  );
}
 