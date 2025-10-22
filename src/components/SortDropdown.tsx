import { SortOption } from '@/types/contact';
import { ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as SortOption)}>
      <SelectTrigger className="w-[180px] glass">
        <ArrowUpDown className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="glass-card border-0">
        <SelectItem value="a-z">A to Z</SelectItem>
        <SelectItem value="z-a">Z to A</SelectItem>
        <SelectItem value="recent">Recently Added</SelectItem>
      </SelectContent>
    </Select>
  );
};
