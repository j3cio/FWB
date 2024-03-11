import { Skeleton } from '@mui/material'

const ProductCardSkeleton = () => {
    return (
        <div
            style={{
                width: '282px',
                height: '322px',
                backgroundColor: 'white',
                borderRadius: 20,
                margin: 4,
                marginTop: '20px',
            }}
        >
            {/* the default variant is text, but that leads to some weird scaling, shifting to rectangular gives more direct styling control */}
            <Skeleton
                sx={{
                    bgcolor: '#CED2E4',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
                variant="rectangular"
                height={'72%'}
            />
            <div className="flex flex-col items-center mt-2">
                <Skeleton
                    variant="rectangular"
                    width={'83%'}
                    height={26}
                    sx={{
                        bgcolor: '#CED2E4',
                        borderRadius: '5px',
                    }}
                />
                <div
                    className="flex mt-1 justify-between items-center"
                    style={{ width: '83%' }}
                >
                    <div className="flex">
                        <Skeleton
                            sx={{
                                bgcolor: '#CED2E4',
                            }}
                            variant="circular"
                            width={24}
                            height={24}
                        />
                        <Skeleton
                            variant="circular"
                            sx={{ bgcolor: '#CED2E4', marginLeft: -0.6 }}
                            width={24}
                            height={24}
                        />
                        <Skeleton
                            variant="circular"
                            width={24}
                            height={24}
                            sx={{ bgcolor: '#CED2E4', marginLeft: -0.6 }}
                        />
                    </div>

                    <Skeleton
                        variant="rectangular"
                        width={160}
                        height={18}
                        sx={{ bgcolor: '#CED2E4', borderRadius: '5px' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCardSkeleton
