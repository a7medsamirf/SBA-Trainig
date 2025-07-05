"use client";

import {
  Alert,
  AsyncSelectInput,
  Button,
  CheckboxController,
  ImageInput,
  Input,
  RadioInputController,
  SearchInput,
  SelectInput,
  ReactDatePickerController,
  RadioGroup,
  CheckboxGroup,
  Dialog,
  Checkbox,
  RadioInput,
  Tooltip,
  Menu,
  IconButton,
  Slider,
  ReactDatePicker,
} from "@/components";
import { useForm } from "react-hook-form";
import "./page.scss";
import { useState } from "react";
import { Collapse } from "@/components";
import { cn, createQueryString } from "@/utils";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

const loadOptions = async (inputValue: string) => {
  console.log("🚀 ~ loadOptions ~ inputValue:", inputValue);
  const response = new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { value: 4, label: "Option 4" },
        { value: 5, label: "Option 5" },
        { value: 6, label: "Option 6" },
      ]);
    }, 1000);
  });

  const data = (await response) as { value: number; label: string }[];

  if (!inputValue) return data;

  return data.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const Page = () => {
  const { control, setValue, trigger } = useForm({ mode: "onChange" });

  const form = useForm({ mode: "onChange" });
  const form2 = useForm({ mode: "onChange" });
  const form3 = useForm({ mode: "onChange" });

  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [startDate, setStartDate] = useState<Date | null>(
    from ? new Date(from) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(to ? new Date(to) : null);

  const router = useRouter();
  const pathname = usePathname();

  const onChangeDate = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const prevQueries = Object.fromEntries(searchParams.entries());
      const queries = createQueryString({
        ...prevQueries,
        from: start?.toISOString(),
        to: end?.toISOString(),
      });

      router.replace(`${pathname}?${queries}`);
    }
  };

  const [selectedDate2, setSelectedDate2] = useState<Date | undefined>(
    new Date("2025-01-01")
  );

  const onDateChange2 = (date: any) => {
    console.log("🚀 ~ onDateChange2 ~ date:", date);
    setSelectedDate2(date);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Example: Set minDate to 2007 and maxDate to 2030
  const minDate = new Date(2007, 0, 1); // January 1, 2007
  const maxDate = new Date(2030, 11, 31); // December 31, 2030

  return (
    <main className="flex flex-col gap-5 p-5">
      <Input
        control={control}
        name="bankInfo.iban"
        label="IBAN"
        placeholder="IBAN"
        required
        rules={{
          pattern: {
            value: /^[A-Z]{2}\d{22}$/,
            message: "Invalid IBAN",
          },
        }}
        capitalize
        // callback={handleSaving}
        requiredMessage="IBAN is required"
      />

      <ReactDatePicker
        className="!w-full sm:!w-[246px]"
        wrapperClassName={cn("!h-[46px]")}
        startDate={startDate}
        selected={startDate}
        endDate={endDate}
        onChange={onChangeDate}
        selectsRange
        dateFormat="d MMMM yyyy"
      />

      <ReactDatePicker
        className="!w-full sm:!w-[246px]"
        wrapperClassName={cn("!h-[46px]")}
        selected={selectedDate2}
        onChange={onDateChange2}
        dateFormat="d MMMM yyyy"
        minDate={new Date()}
        // maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      />

      <h1>Input</h1>
      <div className="grid grid-cols-3 gap-3">
        <Input name="name" control={control} label="Name" placeholder="Name" />

        <Input
          name="name-disabled"
          control={control}
          label="Name"
          placeholder="Disabled"
          disabled
        />

        <Input name="name" control={control} label="Name" placeholder="Name" />

        <Input
          name="name-bold"
          control={control}
          label="Name"
          placeholder="Bold"
          fontBold
        />

        <Input
          name="name-secondary"
          control={control}
          label="Name"
          placeholder="Name with secondary color"
          isSecondary
        />

        <Input
          name="name-readonly"
          control={control}
          label="Name"
          placeholder="Read only"
          readOnly
        />

        <Input
          name="name-password"
          control={control}
          label="Name"
          placeholder="Read only"
          type="password"
        />

        <Input
          name="name-tel"
          control={control}
          label="Name"
          placeholder="Read only"
          type="tel"
        />

        <Input
          name="number"
          control={control}
          label="Number"
          placeholder="Number"
          type="number"
        />

        <Input
          name="name-rules"
          control={control}
          label="Name"
          placeholder="With rules"
          rules={{ required: "This field is required" }}
        />
      </div>

      <h1>Radio</h1>

      <RadioInput id="radio-controller" label="Radio" value="test" />

      <div className="flex gap-3">
        <RadioInputController
          name="radio"
          label="Radio"
          value="radio"
          checked={true}
          control={control}
        />

        <form onSubmit={form2.handleSubmit((data) => console.log(data))}>
          <RadioGroup
            name="radio-group"
            label="Radio"
            control={form2.control}
            required
            options={[
              { label: "Option 1", value: "1" },
              { label: "Option 2", value: "2" },
              { label: "Option 3", value: "3" },
            ]}
          />

          <Button type="submit">Submit</Button>
        </form>
      </div>

      <h1>Search Input</h1>

      <div className="flex gap-3">
        <SearchInput placeholder="Search" onChange={() => {}} />

        <SearchInput
          placeholder="Search"
          onChange={() => {}}
          onKeyPress={() => {
            console.log("key pressed");
          }}
        />
      </div>

      <h1>Alert</h1>

      <div className="grid grid-cols-3 gap-3">
        <Alert type="error" message="This is an error message" />
        <Alert type="success" message="This is an success message" />
        <Alert type="warning" message="This is an warning message" />
      </div>
      <div>
        <h2>test check</h2>
        <Checkbox id="test" label="Checkbox" />
      </div>

      <h1>Checkbox</h1>
      <CheckboxController label="Checkbox" name="checkbox" control={control} />

      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("🚀 ~ <formonSubmit={form.handleSubmit ~ data:", data);
        })}
      >
        <CheckboxGroup
          label="Checkbox"
          name="new-one"
          control={form.control}
          required
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
        />

        <Button type="submit">Submit</Button>
      </form>

      <h1>Buttons</h1>

      <div className="grid grid-cols-3 gap-3">
        <Button type="submit">Default</Button>
        <Button outline>Default</Button>
        <Button disabled>Default</Button>
        <Button disabled outline>
          Default
        </Button>
        <Button variant="blue">Default</Button>
        <Button variant="blue" outline>
          Default
        </Button>
        <Button variant="green">Default</Button>
        <Button outline variant="green">
          Default
        </Button>
        <Button variant="gray">Default</Button>
        <Button outline variant="gray">
          Default
        </Button>
        <Button variant="orange">Default</Button>
        <Button outline variant="orange">
          Default
        </Button>
        <Button variant="primary">Default</Button>
        <Button outline variant="primary">
          Default
        </Button>
        <Button variant="red">Default</Button>
        <Button outline variant="red">
          Default
        </Button>
        <Button variant="third">Default</Button>
        <Button outline variant="third">
          Default
        </Button>
        <Button variant="white">Default</Button>
        <Button outline variant="white">
          Default
        </Button>

        <Button type="submit" variant="blue" isLoading>
          Default
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <Tooltip
          as="span"
          truncate
          className="!max-w-32"
          tooltip="مثل العقد الاجتماعي أو العقد الإيجاري أو العقد العمالي أو العقد الزواجي أو العقد الوكالة"
          placement="bottom"
        >
          Hover over me Hover over me Hover over me Hover over me Hover over me
          Hover over me Hover over me Hover over me Hover over me Hover over me
        </Tooltip>
        <Tooltip
          as="span"
          truncate
          className="!max-w-32"
          tooltip="Hover over me Hover over me Hover over me Hover over me "
          placement="bottom"
        >
          Hover over me Hover over me Hover over me Hover over me Hover over me
          Hover over me Hover over me Hover over me Hover over me Hover over me
        </Tooltip>
        <Tooltip as="span" tooltip="Hovered!" placement="top">
          Hover over me
        </Tooltip>
        <Tooltip as="span" tooltip="Hovered!" placement="bottom">
          Hover over me
        </Tooltip>
      </div>

      <div className="mx-auto">
        <Tooltip tooltip="Notifications">
          <IconButton
            size="sm"
            onClick={(e) => {
              setAnchorEl((prev) => (prev ? null : e.currentTarget));
            }}
          >
            <div className="notification">
              <div className="relative">
                <span className="notification__has-new" />
              </div>
            </div>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <div className="notification-content">
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
            <p>🔔 New message received</p>
            <p>📦 Your order has been shipped</p>
            <p>👤 New friend request</p>
          </div>
        </Menu>
      </div>

      <h1>DatePicker</h1>
      <div>
        <ReactDatePickerController
          name="date"
          control={control}
          rules={{ required: "This field is required" }}
        />
      </div>

      <h1>ImageInput</h1>

      <ImageInput
        control={control}
        setValue={setValue}
        trigger={trigger}
        className="!w-[544px]"
        name="image"
        label="Image"
        preUpload={false}
        required
        showRules
      />

      <ImageInput
        control={control}
        setValue={setValue}
        trigger={trigger}
        className="!w-[544px]"
        name="image-disabled"
        label="Image Disabled"
        preUpload={false}
        disabled={true}
      />

      <ImageInput
        control={control}
        setValue={setValue}
        trigger={trigger}
        className="!w-[544px]"
        name="image-multiple"
        label="Image Multiple"
        isMultiple
        preUpload={false}
        required
      />

      <Collapse title="collapse">
        <div>collapse content</div>
      </Collapse>

      <h1>SelectInput</h1>

      <SelectInput
        control={control}
        label="Select"
        separator={false}
        name="select"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
      />

      <h1>SelectInput Multi</h1>

      <SelectInput
        control={control}
        label="Select Multi"
        name="select-multi"
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        isClearable={false}
        separator={false}
        isMulti
      />

      <h1>Async Select</h1>

      <div>
        <AsyncSelectInput
          control={control}
          name="asyncSelect"
          options={[
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3" },
            { value: "4", label: "Option 4" },
            { value: "5", label: "Option 5" },
            { value: "6", label: "Option 6" },
          ]}
          loadOptions={loadOptions}
          placeholder="Select"
          // defaultValue={{ value: "2", label: "Option 2" }}
        />
      </div>

      <form onSubmit={form3.handleSubmit((data) => console.log(data))}>
        <h1>Regular Dropdown</h1>

        <SelectInput
          name="myField"
          control={form3.control}
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
          ]}
          label="Choose an option"
          placeholder="Select..."
          required={true}
          separator={false}
        />

        <h1>Async Dropdown</h1>

        <SelectInput
          name="asyncField"
          control={form3.control}
          loadOptions={loadOptions}
          label="Search options"
          placeholder="Type to search..."
          isAsync={true}
          separator={false}
          required
        />

        <Button type="submit">submit</Button>
      </form>

      <div>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>

        <Dialog id="test">
          <div>test dialog</div>
        </Dialog>
      </div>

      <div>
        <Slider defaultValue={20} />
      </div>
    </main>
  );
};

export default Page;
