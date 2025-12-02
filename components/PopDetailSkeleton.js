import Layout from './Layout';
import Skeleton from './Skeleton';

export default function PopDetailSkeleton() {
    return (
        <Layout>
            {/* Breadcrumb Skeleton */}
            <div className="mb-4 flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
            </div>

            {/* Header Skeleton */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-secondary-200 mb-6">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/2" />

                <div className="flex gap-2 mt-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content Skeleton */}
                <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm border border-secondary-200">
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-8 border-b border-secondary-200 pb-8">
                        <div><Skeleton className="h-4 w-20 mb-2" /><Skeleton className="h-6 w-full" /></div>
                        <div><Skeleton className="h-4 w-20 mb-2" /><Skeleton className="h-6 w-full" /></div>
                        <div><Skeleton className="h-4 w-20 mb-2" /><Skeleton className="h-6 w-full" /></div>
                    </div>

                    {/* Sections */}
                    <Skeleton className="h-8 w-40 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-8" />

                    <Skeleton className="h-8 w-40 mb-4" />
                    <div className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="lg:col-span-1 space-y-6">
                    <Skeleton className="h-32 w-full rounded-lg" />
                    <Skeleton className="h-32 w-full rounded-lg" />
                    <Skeleton className="h-32 w-full rounded-lg" />
                </div>

            </div>
        </Layout>
    );
}
