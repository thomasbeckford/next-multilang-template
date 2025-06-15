import { useEffect, useState } from 'react'

export enum DeviceType {
  Mobile,
  Tablet,
  Desktop,
}

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(DeviceType.Desktop)

  useEffect(() => {
    const detectDeviceType = () => {
      const width = window.innerWidth
      if (width < 640) {
        setDeviceType(DeviceType.Mobile)
      } else if (width >= 640 && width < 1300) {
        setDeviceType(DeviceType.Tablet)
      } else {
        setDeviceType(DeviceType.Desktop)
      }
    }

    // Detect once and also on window resize
    detectDeviceType()
    window.addEventListener('resize', detectDeviceType)

    // Cleanup
    return () => window.removeEventListener('resize', detectDeviceType)
  }, []) // Empty array ensures this effect runs only once at mount

  return deviceType
}

export default useDeviceType
