import { AppBar, Box, Skeleton } from '@mui/material'

const GroupCardSkeleton = () => {
  return (
    <div className="mb-6 flex w-full flex-col overflow-hidden rounded-xl px-4">
      <Skeleton
        variant="rectangular"
        height={258}
        sx={{
          bgcolor: '#CED2E4',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <Box className="w-full items-center justify-between gap-3 rounded-b-xl bg-white px-4 py-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Skeleton variant="circular" width={64} height={64} />
            <div className="flex flex-col gap-2 pl-4">
              <Skeleton
                variant="rectangular"
                height={32}
                width={250}
                sx={{
                  borderRadius: 1,
                  bgcolor: '#CED2E4',
                }}
              />
              <Skeleton
                variant="rectangular"
                height={15}
                width={200}
                sx={{
                  borderRadius: 1,
                  bgcolor: '#CED2E4',
                }}
              />
            </div>
          </div>
          <div className="hidden flex-col items-end gap-2 sm:flex">
            <div className="self-end">
              <Skeleton
                variant="rectangular"
                height={15}
                width={200}
                sx={{
                  borderRadius: 1,
                  bgcolor: '#CED2E4',
                }}
              />
            </div>
            <div className="">
              <Skeleton
                variant="rectangular"
                height={32}
                width={250}
                sx={{
                  borderRadius: 1,
                  bgcolor: '#CED2E4',
                }}
              />
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default GroupCardSkeleton
