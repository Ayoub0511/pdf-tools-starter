import { tools } from '@/lib/tools';
export default function ToolPage({ params }) {
 const tool = tools.find(t => t.slug === params.slug);
 return <div>Tool: {tool?.label || 'Not Found'}</div>;
}