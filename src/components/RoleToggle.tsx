import { Role } from '../types/role';

type RoleToggleProps = {
  role: Role;
  onChange: (role: Role) => void;
};

export function RoleToggle({ role, onChange }: RoleToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Role:</span>
      <select
        value={role}
        onChange={(e) => onChange(e.target.value as Role)}
        className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
      >
        <option value="viewer" className="bg-white dark:bg-slate-700">👁️ Viewer</option>
        <option value="admin" className="bg-white dark:bg-slate-700">⚡ Admin</option>
      </select>
    </div>
  );
}
