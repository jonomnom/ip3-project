import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cube'
import 'swiper/css/pagination'
import { EffectCube, Pagination } from 'swiper'

export default function DemoSwiper() {
  return (
    <>
      <Swiper
        effect={'cube'}
        grabCursor={true}
        loop={true}
        slidesPerView={1}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/test1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/test1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/test1.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/test1.png" />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
