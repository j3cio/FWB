import { Box, Skeleton } from "@mui/material";

const ProductFiltersSkeleton = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1A1A23",
        marginTop: "108px",
        marginBottom: "32px",
        position: "sticky",
        top: "112px",
        height: "76px",
        zIndex: 1,
        justifyContent: "flex-end",
        display: "flex",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "24px" }}>
        {/* Creates a blank, iterable array of a predetermined length(in this case 3). equivalent of :
            [undefined, undefined, undefined].
            */}
        {Array.apply(null, Array(3)).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 1,
            }}
          >
            <Skeleton
              variant="rectangular"
              width={100}
              height={20}
              sx={{ borderRadius: "5px", bgcolor: "#CED2E4" }}
            />
            <Skeleton
              variant="rectangular"
              width={246}
              height={48}
              sx={{ borderRadius: "10px", bgcolor: "#CED2E4" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductFiltersSkeleton;
