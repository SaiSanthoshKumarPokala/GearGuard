export default function Dashboard() {

    return (
        <>
            <div className="flex flex-col items-center w-full">
                <div className="search">

                </div>
                <div className="summary flex flex-wrap gap-6 items-center justify-evenly">
                    <div className="flex flex-col items-center justify-evenly">
                        <p>Critical Equipment</p>
                        <p>5 units</p>
                    </div>
                    <div className="flex flex-col items-center justify-evenly">
                        <p>Technician Load</p>
                        <p>85% Utilized</p>
                    </div>
                    <div className="flex flex-col items-center justify-evenly">
                        <p>Open Requests</p>
                        <p>12 Pending</p>
                        <p>10 Overdue</p>
                    </div>
                </div>
                <table class="min-w-full rounded-md">
                    <thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Name</th>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Title</th>
                            <th scope="col" class="px-6 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">Jane Cooper</td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">Regional Paradigm Technician</td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">jane.cooper@example.com</td>
                        </tr>
                        <tr class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">Cody Fisher</td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">Product Directives Officer</td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">cody.fisher@example.com</td>
                        </tr>
                        <tr class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">Leonard Krasner</td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">Senior Designer</td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">leonard.krasner@example.com</td>
                        </tr>
                        <tr class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">Emily Selman</td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">VP, Hardware Engineering</td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">emily.selman@example.com</td>
                        </tr>
                        <tr class="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                            <td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-white">Anna Roberts</td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">Chief Strategy Officer</td>
                            <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-600 dark:text-gray-400">anna.roberts@example.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}