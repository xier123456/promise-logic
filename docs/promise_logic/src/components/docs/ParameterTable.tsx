import { Parameter } from '@/types/docs'

interface ParameterTableProps {
  parameters: Parameter[]
}

export function ParameterTable({ parameters }: ParameterTableProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Parameter
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {parameters.map((param, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {param.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                {param.type}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                {param.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}