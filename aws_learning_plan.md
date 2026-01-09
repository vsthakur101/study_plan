# AWS Learning Plan

## Overview
A comprehensive AWS learning plan from beginner to advanced practitioner. Total estimated time: 6-12 months to reach professional competency.

---

## Phase 1: AWS Foundations (Weeks 1-4)
**Time: 15-20 hours per week**

### Week 1: AWS Fundamentals
- [ ] **Cloud Computing Basics**
  - Cloud vs On-premises comparison
  - IaaS, PaaS, SaaS models
  - AWS Global Infrastructure
  - Regions, Availability Zones, Edge Locations

- [ ] **AWS Management Console**
  - Account creation and setup
  - IAM user creation and security best practices
  - Billing and cost management basics
  - AWS CLI and SDK installation

### Week 2: Core Services - Compute & Storage
- [ ] **EC2 (Elastic Compute Cloud)**
  - Instance types and families
  - AMIs (Amazon Machine Images)
  - Security groups and NACLs
  - Key pairs and SSH access

- [ ] **S3 (Simple Storage Service)**
  - Bucket creation and configuration
  - Storage classes (Standard, IA, Glacier)
  - Versioning and lifecycle policies
  - Security and access controls

### Week 3: Core Services - Networking & Database
- [ ] **VPC (Virtual Private Cloud)**
  - VPC creation and CIDR blocks
  - Subnets (public and private)
  - Internet Gateways and NAT Gateways
  - Route tables and DNS

- [ ] **RDS (Relational Database Service)**
  - Database engines (MySQL, PostgreSQL, etc.)
  - Multi-AZ deployments
  - Read replicas
  - Backup and snapshots

### Week 4: Security & Monitoring
- [ ] **IAM (Identity and Access Management)**
  - Users, groups, and roles
  - Policies and permissions
  - MFA configuration
  - Service-linked roles

- [ ] **CloudWatch**
  - Metrics and alarms
  - Logs and log insights
  - Dashboards
  - CloudTrail for API logging

**Practice Projects:**
- Set up a secure AWS account with IAM best practices
- Deploy a simple web application using EC2 and S3
- Create a VPC with public and private subnets
- Monitor resources with CloudWatch

---

## Phase 2: Core Services Deep Dive (Weeks 5-12)
**Time: 20-25 hours per week**

### Weeks 5-6: Advanced Compute Services
- [ ] **Elastic Load Balancing (ELB)**
  - Application Load Balancer (ALB)
  - Network Load Balancer (NLB)
  - Gateway Load Balancer (GWLB)
  - Target groups and health checks

- [ ] **Auto Scaling**
  - Auto Scaling groups
  - Scaling policies (manual, dynamic, predictive)
  - Launch templates and configurations
  - Lifecycle hooks

- [ ] **Lambda (Serverless)**
  - Function creation and configuration
  - Runtime environments and layers
  - Trigger sources and integrations
  - Cold start optimization

### Weeks 7-8: Storage & Databases
- [ ] **Advanced S3 Features**
  - Cross-Region Replication
  - S3 Transfer Acceleration
  - S3 Select and Glacier
  - Event notifications with SNS/SQS

- [ ] **DynamoDB (NoSQL)**
  - Tables, items, and attributes
  - Primary keys (partition and sort keys)
  - Streams and global tables
  - DAX (DynamoDB Accelerator)

- [ ] **Aurora**
  - Aurora architecture and benefits
  - Serverless Aurora
  - Global databases
  - Backtracking and cloning

### Weeks 9-10: Networking & Content Delivery
- [ ] **Route 53**
  - Domain registration
  - Hosted zones and record types
  - Routing policies (simple, weighted, latency)
  - Health checks and failover

- [ ] **CloudFront (CDN)**
  - Distributions and behaviors
  - Origins and origin groups
  - Caching and TTL
  - Signed URLs and cookies

- [ ] **VPC Advanced Features**
  - VPC peering and transit gateway
  - PrivateLink and endpoints
  - Flow logs and network ACLs
  - Bastion hosts and VPN

### Weeks 11-12: Security & Compliance
- [ ] **Advanced Security**
  - AWS WAF (Web Application Firewall)
  - Shield (DDoS protection)
  - Inspector and Macie
  - Secrets Manager

- [ ] **Compliance & Governance**
  - AWS Config
  - Service Control Policies (SCPs)
  - AWS Organizations
  - CloudTrail and audit logging

**Practice Projects:**
- Build a highly available web application with ELB and Auto Scaling
- Implement a serverless API with Lambda and API Gateway
- Set up a global content delivery network
- Implement comprehensive security monitoring

---

## Phase 3: Specialization Paths (Weeks 13-24)
**Time: 25-30 hours per week**

### Choose ONE Specialization:

#### Option A: Cloud Architect
- [ ] **Advanced Architecture**
  - Well-Architected Framework
  - Hybrid cloud architectures
  - Multi-account strategies
  - Cost optimization patterns

- [ ] **Migration & Deployment**
  - AWS Migration Hub
  - Application Discovery Service
  - Database Migration Service (DMS)
  - CloudFormation and Infrastructure as Code

- [ ] **Enterprise Solutions**
  - Enterprise Support setup
  - Service Quotas and limits
  - Advanced networking patterns
  - Disaster recovery strategies

#### Option B: DevOps Engineer
- [ ] **CI/CD Pipelines**
  - CodePipeline, CodeBuild, CodeDeploy
  - CodeCommit and CodeStar
  - Jenkins on AWS
  - GitHub Actions integration

- [ ] **Infrastructure as Code**
  - CloudFormation advanced features
  - AWS CDK (Cloud Development Kit)
  - Terraform with AWS
  - Infrastructure testing

- [ ] **Containers & Orchestration**
  - ECS (Elastic Container Service)
  - EKS (Elastic Kubernetes Service)
  - Fargate (serverless containers)
  - ECR (Elastic Container Registry)

#### Option C: Solutions Architect
- [ ] **Application Integration**
  - SQS, SNS, and EventBridge
  - API Gateway advanced features
  - Step Functions
  - AppSync (GraphQL)

- [ ] **Data & Analytics**
  - EMR (Elastic MapReduce)
  - Redshift (Data Warehouse)
  - Kinesis (Data Streaming)
  - QuickSight (Business Intelligence)

- [ ] **Machine Learning**
  - SageMaker
  - Comprehend and Transcribe
  - Rekognition (Image/Video Analysis)
  - Lambda@Edge and AI/ML integration

**Practice Projects:**
- Design and implement a multi-tier web application
- Build a complete CI/CD pipeline
- Deploy a containerized microservices architecture
- Create a data analytics pipeline

---

## Phase 4: Advanced Topics (Weeks 25-36)
**Time: 30-35 hours per week**

### Weeks 25-28: Advanced Security & Operations
- [ ] **Advanced Security**
  - AWS Security Hub
  - GuardDuty and threat detection
  - IAM best practices deep dive
  - Encryption and Key Management (KMS)

- [ ] **Operations Management**
  - AWS OpsWorks
  - Systems Manager
  - Trusted Advisor
  - AWS Backup

### Weeks 29-32: Cost Optimization & Governance
- [ ] **Cost Management**
  - Cost Explorer and budgets
  - Reserved Instances and Savings Plans
  - Spot instances
  - Cost allocation tags

- [ ] **Governance**
  - AWS Control Tower
  - Service Catalog
  - License Manager
  - Audit and compliance automation

### Weeks 33-36: Emerging Technologies
- [ ] **Edge Computing**
  - Snowball and Snowmobile
  - AWS Outposts
  - Local Zones and Wavelength
  - IoT services

- [ ] **Quantum Technologies**
  - Amazon Braket
  - Future quantum computing applications
  - Hybrid classical-quantum solutions

**Practice Projects:**
- Implement zero-trust security architecture
- Build a comprehensive cost monitoring system
- Design edge computing solutions
- Explore quantum computing applications

---

## Certification Path

### AWS Certified Cloud Practitioner (CLF-C01)
**Prerequisites**: None
**Study Time**: 2-3 weeks
**Focus Areas:**
- [ ] Cloud concepts
- [ ] Security and compliance
- [ ] Technology and billing
- [ ] Core AWS services

### AWS Certified Solutions Architect - Associate (SAA-C03)
**Prerequisites**: 6+ months experience
**Study Time**: 2-3 months
**Focus Areas:**
- [ ] Resilient architectures
- [ ] High-performing architectures
- [ ] Secure applications
- [ ] Cost-optimized architectures
- [ ] Deployment operations

### AWS Certified Developer - Associate (DVA-C02)
**Prerequisites**: 6+ months experience
**Study Time**: 2-3 months
**Focus Areas:**
- [ ] Development with AWS services
- [ ] Deployment and debugging
- [ ] Security best practices
- [ ] Monitoring and troubleshooting

### AWS Certified DevOps Engineer - Professional (DOP-C01)
**Prerequisites**: Solutions Architect - Associate or Developer - Associate
**Study Time**: 3-4 months
**Focus Areas:**
- [ ] CI/CD pipelines
- [ ] Infrastructure as Code
- [ ] Monitoring and logging
- [ ] Security and governance
- [ ] High availability and disaster recovery

### AWS Certified Solutions Architect - Professional (SAP-C02)
**Prerequisites**: Solutions Architect - Associate
**Study Time**: 4-6 months
**Focus Areas:**
- [ ] Organizational design
- [ ] Migration planning
- [ ] Cost control
- [ ] Continuous improvement
- [ ] Multi-account strategies

---

## Hands-On Labs and Practice

### AWS Free Tier Usage
- [ ] **Compute**: 750 hours/month EC2 t2.micro
- [ ] **Storage**: 5 GB S3 standard storage
- [ ] **Database**: 750 hours/month RDS
- [ ] **Network**: 1 million CloudFront requests

### Practice Platforms
- [ ] **AWS Skill Builder**
  - Digital courses and labs
  - Certification prep materials
  - Role-based learning paths
  - Hands-on labs

- [ ] **Qwiklabs (Google)**
  - AWS-focused labs
  - Real AWS console access
  - Guided tutorials
  - Challenge labs

- [ ] **A Cloud Guru**
  - Video courses
  - Hands-on labs
  - Practice exams
  - Community support

### Personal Projects
- [ ] **Blog Platform**: S3 static site, CloudFront, Route 53
- [ ] **E-commerce Site**: EC2, RDS, ELB, Auto Scaling
- [ ] **Serverless API**: Lambda, API Gateway, DynamoDB
- [ ] **Data Pipeline**: Kinesis, Lambda, S3, QuickSight
- [ ] **Microservices App**: ECS/EKS, RDS, ElastiCache

---

## Learning Resources

### Official AWS Resources
- [ ] **AWS Documentation** - Comprehensive service guides
- [ ] **AWS Whitepapers** - Best practices and architectures
- [ ] **AWS Well-Architected Tool** - Architecture review
- [ ] **AWS Training and Certification** - Official courses

### Books and Publications
- [ ] **"AWS Certified Solutions Architect Official Study Guide"**
- [ ] **"AWS in Action" by Andreas Wittig**
- [ ] **"Amazon Web Services in Action"**
- [ ] **"Learning AWS" by Apress**

### Online Courses
- [ ] **Udemy** - "Ultimate AWS Certified Solutions Architect"
- [ ] **Coursera** - AWS specialization courses
- [ ] **Pluralsight** - AWS skill paths
- [ ] **A Cloud Guru** - AWS certification prep

### Community and Support
- [ ] **AWS Forums** - Official discussion boards
- [ ] **Stack Overflow** - Technical questions
- [ ] **Reddit r/aws** - Community discussions
- [ ] **AWS User Groups** - Local meetups

---

## AWS Services Mastery Checklist

### Compute Services
- [ ] EC2 (Instance types, AMIs, Security Groups)
- [ ] Lambda (Functions, Layers, Triggers)
- [ ] ECS (Task definitions, Services, Clusters)
- [ ] EKS (Clusters, Nodes, Add-ons)
- [ ] Elastic Beanstalk (Applications, Environments)
- [ ] Lightsail (Instances, Containers, Databases)

### Storage Services
- [ ] S3 (Buckets, Objects, Lifecycle, Replication)
- [ ] EFS (File systems, Mount targets)
- [ ] EBS (Volumes, Snapshots, Encryption)
- [ ] Snow Family (Snowball, Snowcone, Snowmobile)

### Database Services
- [ ] RDS (Instances, Read replicas, Multi-AZ)
- [ ] DynamoDB (Tables, Items, Streams)
- [ ] Aurora (Clusters, Serverless, Global)
- [ ] Redshift (Clusters, Spectrum, ML)
- [ ] Neptune (Graph database)

### Networking Services
- [ ] VPC (Subnets, Route tables, Gateways)
- [ ] Route 53 (Domains, Records, Health checks)
- [ ] CloudFront (Distributions, Origins)
- [ ] ELB (ALB, NLB, GWLB)
- [ ] Direct Connect (Connections, Virtual Interfaces)

### Security Services
- [ ] IAM (Users, Roles, Policies)
- [ ] Security Hub (Findings, Compliance)
- [ ] GuardDuty (Threat detection)
- [ ] WAF & Shield (Web protection)
- [ ] KMS (Keys, Encryption)

---

## Cost Management Strategy

### Cost Optimization Techniques
- [ ] **Right Sizing**: Match instance types to workloads
- [ ] **Reserved Instances**: Commit to 1-3 years for discounts
- [ ] **Savings Plans**: Flexible compute usage discounts
- [ ] **Spot Instances**: Utilize spare capacity at lower costs
- [ ] **Auto Scaling**: Scale resources based on demand

### Monitoring Costs
- [ ] **Cost Explorer**: Analyze spending patterns
- [ ] **Budgets**: Set alerts for cost thresholds
- [ ] **Resource Tags**: Categorize costs by project/team
- [ ] **Trusted Advisor**: Optimization recommendations

---

## Best Practices and Tips

### Security Best Practices
- [ ] Use IAM roles instead of access keys
- [ ] Enable MFA for all users
- [ ] Implement least privilege access
- [ ] Use VPC with private subnets
- [ ] Enable CloudTrail logging

### Architecture Best Practices
- [ ] Follow Well-Architected Framework
- [ ] Design for high availability
- [ ] Implement proper monitoring
- [ ] Use managed services when possible
- [ ] Plan for disaster recovery

### Learning Tips
- [ ] Start with free tier resources
- [ ] Build projects to reinforce learning
- [ ] Join AWS communities and forums
- [ ] Stay updated with new services
- [ ] Practice with real-world scenarios

---

## Implementation Timeline

### Monthly Goals
**Month 1-3: Foundation**
- [ ] Complete Cloud Practitioner certification
- [ ] Set up personal AWS account
- [ ] Complete basic labs and tutorials
- [ ] Build first simple application

**Month 4-6: Core Services**
- [ ] Complete Solutions Architect - Associate
- [ ] Deploy multi-tier application
- [ ] Implement security best practices
- [ ] Optimize costs

**Month 7-9: Specialization**
- [ ] Choose and complete specialty track
- [ ] Work on complex project
- [ ] Prepare for professional certification
- [ ] Contribute to community

**Month 10-12: Advanced**
- [ ] Complete professional certification
- [ ] Design enterprise architecture
- [ ] Mentor others
- [ ] Stay current with updates

---

**Remember**: AWS services evolve constantly. Focus on understanding core concepts first, then build expertise in specific areas. Hands-on experience is crucial - build projects, experiment with services, and learn from mistakes. The cloud journey is continuous learning and adaptation.