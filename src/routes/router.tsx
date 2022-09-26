import { Suspense } from "react";
import { Route, Routes, } from 'react-router-dom';
import About from "@/pages/About/About";
import Home from '@/pages/Home/Home'
import NotFound from "@/pages/NotFound";
import LandingLayout from "@/layouts/LandingLayout";
import Upload from "@/pages/Upload/Upload";

const Router = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LandingLayout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path = '/upload' element={<Upload />} />
                <Route path='/404' element={<NotFound />} />
            </Routes>
            </LandingLayout>
        </Suspense>
    )
}

export default Router