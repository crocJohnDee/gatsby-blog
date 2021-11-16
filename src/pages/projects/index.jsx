import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../../components/Layout"
import { portfolio, projects } from "../../styles/projects.module.css"

export default function Projects({ data }) {
  const allProjects = data.projects.nodes
  const { contact } = data.contact.siteMetadata
  console.log(allProjects)
  return (
    <Layout>
      <div className={portfolio}>
        <h2>Portfolio</h2>
        <h3>Projects & Websites I've created</h3>
        <div className={projects}>
          {allProjects.map(project => (
            <Link key={project.id} to={`/projects/${project.frontmatter.slug}`}>
              <div>
                <GatsbyImage
                  image={getImage(project.frontmatter.thumb)}
                  alt={project.frontmatter.title}
                />
                <h3>{project.frontmatter.title}</h3>
                <p>{project.frontmatter.stack}</p>
              </div>
            </Link>
          ))}
        </div>
        {contact}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    projects: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          stack
          title
          slug
          thumb {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        id
      }
    }
    contact: site {
      siteMetadata {
        contact
      }
    }
  }
`
