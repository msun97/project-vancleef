import React from 'react'

const Kbrand = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
      {/* YouTube 영상 섹션 */}
      <div className="mb-16 relative flex justify-center overflow-hidden rounded-lg shadow-lg">
        <iframe 
          className="w-full aspect-video" 
          src="https://www.youtube.com/embed/r2fHNyqPUJs" 
          title="Seoul Maison opening" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>
      </div>
      
      {/* 이미지 카드 섹션 */}
      <div className="mt-12">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <li className="group hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden bg-gray-50">
            <div className="relative overflow-hidden">
              <img 
                src="/imgaes/kbrand1.png" 
                alt="블랙핑크 지수 - Van Cleef Arpels" 
                className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 text-lg mb-1">블랙핑크 지수가 선택한</p>
              <p className="text-gray-900 text-2xl font-bold">Van Cleef Arpels Line</p>
            </div>
          </li>
          
          <li className="group hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden bg-gray-50">
            <div className="relative overflow-hidden">
              <img 
                src="/imgaes/kbrand2.png" 
                alt="서울 한남동 - Van Cleef" 
                className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 text-center">
              <p className="text-gray-600 text-lg mb-1">서울 한남동에서 발견한</p>
              <p className="text-gray-900 text-2xl font-bold">Van Cleef</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Kbrand