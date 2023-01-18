import * as React from "react";

import ButtonLink from "@/components/links/ButtonLink";
import { UnstyledLinkProps } from "@/components/links/UnstyledLink";
import NextImage from "@/components/NextImage";
import Tag from "@/components/Tag";
import Typography from "@/components/Typography";
import clsxm from "@/lib/clsxm";
import { ProjectDataType } from "@/types/entitas/projects";

type ProjectCardProps = {
  card: ProjectDataType;
  onClick?: () => void;
} & Omit<UnstyledLinkProps, "children" | "href">;

export default function ProjectCard({ card, onClick }: ProjectCardProps) {
  return (
    <div
      className={clsxm(
        "flex flex-col justify-between shadow-lg py-2 border border-primary-300 rounded-md",
        "shadow-primary-700 group h-[520px] pb-4"
      )}
      onClick={onClick}
    >
      <div>
        <NextImage
          src={card.image}
          alt={card.name}
          width={800}
          height={400}
          className="w-full"
          imgClassName="rounded-sm"
        />
        <div className="px-4 mt-4 w-full flex flex-col justify-center">
          <div className="flex justify-between items-center">
            <Typography
              variant="h3"
              as="h3"
              color="primary"
              className="font-secondary"
            >
              {card.name}
            </Typography>
            <div>
              <Typography variant="c2" color="gray" className="font-secondary">
                {card.date_start} - {card.date_end}
              </Typography>
            </div>
          </div>
          <div className="space-x-2">
            {card.technologies.map((tech, index) => (
              <Tag key={index} className="mt-2">
                {tech}
              </Tag>
            ))}
          </div>
          <Typography
            variant="p"
            color="primary"
            className="mt-2 font-secondary text-ellipsis text-justify"
          >
            {card.description}
          </Typography>
        </div>
      </div>
      <div className="mt-2 pl-4 flex gap-x-4">
        <ButtonLink href={card.github} variant="primary" openNewTab>
          Github
        </ButtonLink>
        <ButtonLink href={card.url} variant="primary" openNewTab>
          Demo
        </ButtonLink>
      </div>
    </div>
  );
}
