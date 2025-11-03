import Banner from '@/components/Banner'
import MainSection from '@/components/MainSection'
import Success from '@/components/Success'

export const metadata = {
  title: 'Home | DocTalk',
  description: 'Connect with verified, experienced doctors across various specialties',
}

export default function Home() {
    return (
        <>
            <Banner />
            <MainSection />
            <Success />
        </>
    )
}

