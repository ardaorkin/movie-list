import { Button, Form, Input, InputNumber, Select } from "antd";
import * as React from "react";
import { searchOptions } from "../types";

export interface IFiltersProps {
  defaultFilter: searchOptions;
  onApplyFilters: (filters: searchOptions) => void;
}

export function Filters({ onApplyFilters, defaultFilter }: IFiltersProps) {
  const [filters, setFilters] = React.useState<searchOptions>(defaultFilter);

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleFilters = (
    filterName: keyof searchOptions,
    value: string | number | null
  ) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  return (
    <Form layout="inline" onFinish={handleApply}>
      <Form.Item>
        <Input
          defaultValue={defaultFilter.search}
          onChange={(event?) => handleFilters("search", event?.target?.value)}
          placeholder="Search by title..."
        />
      </Form.Item>
      <Form.Item>
        <InputNumber
          defaultValue={
            defaultFilter.year ? parseInt(defaultFilter.year) : undefined
          }
          type="number"
          min={1888} // first movie
          max={new Date().getFullYear()}
          onChange={(value) => handleFilters("year", value)}
          placeholder="Search by year..."
        />
      </Form.Item>
      <Form.Item>
        <Select
          defaultValue={defaultFilter.type}
          allowClear
          style={{ width: "8em", textAlign: "start" }}
          placeholder="Filter by type..."
          onChange={(selection) => handleFilters("type", selection)}
        >
          {["movie", "series", "episode"].map((type) => (
            <Select.Option value={type}>
              {type.charAt(0).toUpperCase() + type.substring(1)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Apply
        </Button>
      </Form.Item>
    </Form>
  );
}
