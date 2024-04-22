import { AppBar, Box, Skeleton } from '@mui/material'
import { useMediaQuery } from 'react-responsive'

const NavBarSkeleton = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 640px)',
  })

  return (
    <>
      {isDesktop ? (
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#1A1A23',
            boxShadow: 'none',
            paddingY: '32px',
            paddingX: '18px',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            height: '112px',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Skeleton
              variant="rectangular"
              width={174}
              height={48}
              sx={{
                borderRadius: 250,
                bgcolor: '#CED2E4',
                marginRight: '3.8vw',
                marginLeft: '.5vw',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'right',
                position: 'relative',
                borderRadius: '100px',
                flexGrow: '1',
                width: 689,
                border: 'none',
              }}
            >
              <div className="flex w-full justify-end">
                <Skeleton
                  variant="rectangular"
                  height={48}
                  width={'95%'}
                  sx={{ bgcolor: '#CED2E4', borderRadius: '100px' }}
                />
                <Skeleton
                  variant="circular"
                  height={40}
                  width={40}
                  sx={{
                    position: 'absolute',
                    right: '4px',
                    top: '4px',
                    bgcolor: '#ADB4D2',
                  }}
                />
              </div>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: '24px',
                marginLeft: '24px',
                marginRight: '4px',
              }}
            >
              {/* Creates a blank, iterable array of a predetermined length(in this case 4). equivalent of :
            [undefined, undefined, undefined, undefined].
            */}
              {Array.apply(null, Array(4)).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="circular"
                  sx={{ bgcolor: '#CED2E4' }}
                  width={50}
                  height={50}
                />
              ))}
            </Box>
          </Box>
        </AppBar>
      ) : (
        <div className="flex items-center justify-between px-4 py-8">
          <div className="flex items-center gap-4">
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: '#CED2E4', borderRadius: '5px' }}
              width={24}
              height={24}
            />
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: '#CED2E4', borderRadius: '16px' }}
              width={100}
              height={32}
            />
          </div>
          <div className=" flex items-center gap-4">
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: '#CED2E4', borderRadius: '5px' }}
              width={24}
              height={24}
            />
            <Skeleton
              variant="rectangular"
              sx={{ bgcolor: '#CED2E4', borderRadius: '5px' }}
              width={24}
              height={24}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default NavBarSkeleton
