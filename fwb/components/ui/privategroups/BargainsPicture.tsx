import theme from "@/app/theme";
import BlueArrowForward from "@/components/ui/profile/BlueArrowForward";
import { Button } from "@mui/material";
import Image from "next/image";
import BargainBackgroundImage from "../../../public/bargain1700x350.png";

const bargains_picture = () => {
  return (
    <div className="rounded-3xl items-center justify-center relative z-0">
      <Image
        src={BargainBackgroundImage}
        alt="Image Alt Text"
        className="object-cover object-center"
        style={{
          width: "97%",
          height: "auto",
          objectFit: "cover",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="flex w-1/6 ml-48 mt-10 text-6xl font-bold text-yellow-200">Booty Call for Bargains!</h1>
        <div className="flex flex-row-reverse w-5/6 mr-28">
          <Button
            endIcon={<BlueArrowForward />}
            variant="contained"
            sx={{
              borderRadius: 28,
              borderStyle: "solid",
              borderColor: "white",
              borderWidth: 2,
              bgcolor: `${theme.palette.secondary.light}`,
              color: `${theme.palette.primary.dark}`,
              ':hover': {
                bgcolor: `${theme.palette.secondary.light}`, // Hover background color
                color: `${theme.palette.primary.dark}`, // Hover text color
              }
            }}
          >
            Share your discount
          </Button>
        </div>
      </div>
    </div>
  );
};

export default bargains_picture;
