import ABA from "@/assets/payway/aba.png";
import Imgae from "next/image";
import { FaHandHoldingHeart } from "react-icons/fa";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

let SharingHeartAboutUs = () => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <FaHandHoldingHeart />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <p>Empower Innovation – Support Our Developers</p>
            </AlertDialogTitle>
            <AlertDialogDescription>
              {" "}
              <Imgae src={ABA} className="w-full object-contain  h-80" alt="" />
              <span>
                Community Growth: By funding developers, you’re fostering a
                vibrant open-source ecosystem where creativity and collaboration
                thrive.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <Link href="/content/paycoffee"> Support us</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SharingHeartAboutUs;
