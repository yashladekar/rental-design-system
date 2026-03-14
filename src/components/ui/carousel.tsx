'use client';

import * as React from 'react';
import useEmblaCarousel, {
    type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Box, IconButton } from '@mui/material';
import { cn } from '@/lib/utils';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: 'horizontal' | 'vertical';
    setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
    const context = React.useContext(CarouselContext);
    if (!context) {
        throw new Error('useCarousel must be used within a <Carousel />');
    }
    return context;
}

// ----------------------------------------------------------------------
// 1. Carousel Root (Context Provider & State Manager)
// ----------------------------------------------------------------------
export const Carousel = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof Box> & CarouselProps
>(
    (
        {
            orientation = 'horizontal',
            opts,
            setApi,
            plugins,
            className,
            children,
            ...props
        },
        ref
    ) => {
        // Initialize Embla
        const [carouselRef, api] = useEmblaCarousel(
            {
                ...opts,
                axis: orientation === 'horizontal' ? 'x' : 'y',
            },
            plugins
        );

        const [canScrollPrev, setCanScrollPrev] = React.useState(false);
        const [canScrollNext, setCanScrollNext] = React.useState(false);

        const onSelect = React.useCallback((api: CarouselApi) => {
            if (!api) return;
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        }, []);

        const scrollPrev = React.useCallback(() => {
            api?.scrollPrev();
        }, [api]);

        const scrollNext = React.useCallback(() => {
            api?.scrollNext();
        }, [api]);

        const handleKeyDown = React.useCallback(
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    scrollPrev();
                } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    scrollNext();
                }
            },
            [scrollPrev, scrollNext]
        );

        // Sync state and pass API up
        React.useEffect(() => {
            if (!api || !setApi) return;
            setApi(api);
        }, [api, setApi]);

        React.useEffect(() => {
            if (!api) return;
            onSelect(api);
            api.on('reInit', onSelect);
            api.on('select', onSelect);

            return () => {
                api?.off('select', onSelect);
            };
        }, [api, onSelect]);

        return (
            <CarouselContext.Provider
                value={{
                    carouselRef,
                    api: api,
                    opts,
                    orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
                    scrollPrev,
                    scrollNext,
                    canScrollPrev,
                    canScrollNext,
                }}
            >
                <Box
                    ref={ref}
                    onKeyDownCapture={handleKeyDown}
                    className={cn('ds-carousel relative', className)}
                    role="region"
                    aria-roledescription="carousel"
                    sx={{ position: 'relative' }}
                    {...props}
                >
                    {children}
                </Box>
            </CarouselContext.Provider>
        );
    }
);
Carousel.displayName = 'Carousel';

// ----------------------------------------------------------------------
// 2. Carousel Content (The Scrollable Window)
// ----------------------------------------------------------------------
export const CarouselContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof Box>
>(({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
        // Embla requires the outer div to have overflow: hidden
        <Box ref={carouselRef} sx={{ overflow: 'hidden' }}>
            <Box
                ref={ref}
                className={cn('ds-carousel-content flex', className)}
                sx={{
                    display: 'flex',
                    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
                    // Negative margins are used to offset the padding on items,
                    // keeping the outer edges perfectly flush with the container.
                    ...(orientation === 'horizontal' ? { ml: -2 } : { mt: -2 }),
                }}
                {...props}
            />
        </Box>
    );
});
CarouselContent.displayName = 'CarouselContent';

// ----------------------------------------------------------------------
// 3. Carousel Item (The individual slide)
// ----------------------------------------------------------------------
export const CarouselItem = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof Box>
>(({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
        <Box
            ref={ref}
            role="group"
            aria-roledescription="slide"
            className={cn('ds-carousel-item min-w-0 shrink-0 grow-0', className)}
            sx={{
                minWidth: 0,
                flexShrink: 0,
                flexGrow: 0,
                // The flex basis sets the slide width (default 100%)
                flexBasis: '100%',
                // Padding adds the "gap" between slides without breaking Embla's math
                ...(orientation === 'horizontal' ? { pl: 2 } : { pt: 2 }),
            }}
            {...props}
        />
    );
});
CarouselItem.displayName = 'CarouselItem';

// ----------------------------------------------------------------------
// 4. Carousel Controls (Next/Previous Buttons)
// ----------------------------------------------------------------------
export const CarouselPrevious = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof IconButton>
>(({ className, sx, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
        <IconButton
            ref={ref}
            aria-label="Previous slide"
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            className={cn('ds-carousel-previous', className)}
            sx={{
                position: 'absolute',
                zIndex: 2,
                height: 40,
                width: 40,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                color: 'text.primary',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.10)',
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
                '&.Mui-disabled': {
                    opacity: 0.45,
                    backgroundColor: 'background.paper',
                    borderColor: 'divider',
                },
                // Positioning logic based on orientation
                ...(orientation === 'horizontal'
                    ? {
                        left: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }
                    : {
                        top: 12,
                        left: '50%',
                        transform: 'translateX(-50%) rotate(90deg)',
                    }),
                ...sx,
            }}
            {...props}
        >
            <ArrowLeft size={16} />
        </IconButton>
    );
});
CarouselPrevious.displayName = 'CarouselPrevious';

export const CarouselNext = React.forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof IconButton>
>(({ className, sx, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
        <IconButton
            ref={ref}
            aria-label="Next slide"
            disabled={!canScrollNext}
            onClick={scrollNext}
            className={cn('ds-carousel-next', className)}
            sx={{
                position: 'absolute',
                zIndex: 2,
                height: 40,
                width: 40,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                color: 'text.primary',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.10)',
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
                '&.Mui-disabled': {
                    opacity: 0.45,
                    backgroundColor: 'background.paper',
                    borderColor: 'divider',
                },
                ...(orientation === 'horizontal'
                    ? {
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }
                    : {
                        bottom: 12,
                        left: '50%',
                        transform: 'translateX(-50%) rotate(90deg)',
                    }),
                ...sx,
            }}
            {...props}
        >
            <ArrowRight size={16} />
        </IconButton>
    );
});
CarouselNext.displayName = 'CarouselNext';