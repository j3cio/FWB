import { AppBar, Box, Skeleton } from '@mui/material'

const NavBarSkeleton = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1A1A23',
        boxShadow: 'none',
        paddingTop: '32px',
        paddingBottom: '32px',
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
          width={114}
          height={48}
          sx={{
            borderRadius: 250,
            bgcolor: '#CED2E4',
            marginRight: '4.8vw',
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
          <Skeleton
            variant="rectangular"
            height={48}
            width={'100%'}
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
  )
}

export default NavBarSkeleton
