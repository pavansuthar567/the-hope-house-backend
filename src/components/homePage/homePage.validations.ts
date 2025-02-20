import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const getImageMessage = (fieldName: string) => {
  return {
    'any.required': fieldName + ' is required',
    'string.empty': fieldName + ' is required',
  };
};

const HomePageValidations = {
  createHomePage: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      logo: Joi.string().uri().required().messages(getImageMessage('Logo')),
      quote: Joi.string().min(5).max(255).required(),
      heroSectionVideo: Joi.string().uri().required(),
      whoWeAre: Joi.string().min(10).required(),
      whatWeDo: Joi.string().min(10).required(),
      termsOfUse: Joi.string().min(10).required(),
      privacyPolicy: Joi.string().min(10).required(),
      isActive: Joi.boolean().required(),
      statistics: Joi.object({
        beneficiaryServed: Joi.number().min(0).required(),
        totalVolunteers: Joi.number().min(0).required(),
        cityPresence: Joi.number().min(0).required(),
        donationReceived: Joi.number().min(0).required(),
      }).required(),
      pageImages: Joi.object({
        home: Joi.object({
          whyChooseThumb1: Joi.string().uri().required().messages(getImageMessage('Why Choose Thumb1')),
          whyChooseThumb2: Joi.string().uri().required().messages(getImageMessage('Why Choose Thumb2')),
          togetherBg: Joi.string().uri().required().messages(getImageMessage('Together Background')),
        }).optional(),
        pageTitleBackgrounds: Joi.object({
          about: Joi.string().uri().required().messages(getImageMessage('About page background')),
          teamMembers: Joi.string().uri().required().messages(getImageMessage('Team Members page background')),
          event: Joi.string().uri().required().messages(getImageMessage('Event page background')),
          gallery: Joi.string().uri().required().messages(getImageMessage('Gallery page background')),
          faq: Joi.string().uri().required().messages(getImageMessage('FAQ page background')),
          blog: Joi.string().uri().required().messages(getImageMessage('Blog page background')),
          contact: Joi.string().uri().required().messages(getImageMessage('Contact page background')),
          donate: Joi.string().uri().required().messages(getImageMessage('Donate page background')),
          volunteer: Joi.string().uri().required().messages(getImageMessage('Volunteer page background')),
        }).optional(),
        aboutUsPage: Joi.object({
          empowerCommunities: Joi.string().uri().required().messages(getImageMessage('Empower Communities image')),
          supportTheNextInitiative: Joi.string()
            .uri()
            .required()
            .messages(getImageMessage('Support The Next Initiative image')),
        }).optional(),
      }).optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    } else {
      next();
    }
  },

  updateHomePage: (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      _id: Joi.string().optional(),
      logo: Joi.string().uri().required().messages(getImageMessage('Logo')),
      quote: Joi.string().min(5).max(255).optional(),
      heroSectionVideo: Joi.string().uri().optional(),
      whoWeAre: Joi.string().min(10).optional(),
      whatWeDo: Joi.string().min(10).optional(),
      termsOfUse: Joi.string().min(10).optional(),
      privacyPolicy: Joi.string().min(10).optional(),
      isActive: Joi.boolean().required(),
      createdBy: Joi.string().required(),
      updatedBy: Joi.string().required(),
      createdAt: Joi.date().optional(),
      updatedAt: Joi.date().optional(),
      statistics: Joi.object({
        beneficiaryServed: Joi.number().min(0).optional(),
        totalVolunteers: Joi.number().min(0).optional(),
        cityPresence: Joi.number().min(0).optional(),
        donationReceived: Joi.number().min(0).optional(),
      }).optional(),
      pageImages: Joi.object({
        home: Joi.object({
          whyChooseThumb1: Joi.string().uri().required().messages(getImageMessage('Why Choose Thumb1')),
          whyChooseThumb2: Joi.string().uri().required().messages(getImageMessage('Why Choose Thumb2')),
          togetherBg: Joi.string().uri().required().messages(getImageMessage('Together Background')),
        }).optional(),
        pageTitleBackgrounds: Joi.object({
          about: Joi.string().uri().required().messages(getImageMessage('About page background')),
          teamMembers: Joi.string().uri().required().messages(getImageMessage('Team Members page background')),
          event: Joi.string().uri().required().messages(getImageMessage('Event page background')),
          gallery: Joi.string().uri().required().messages(getImageMessage('Gallery page background')),
          faq: Joi.string().uri().required().messages(getImageMessage('FAQ page background')),
          blog: Joi.string().uri().required().messages(getImageMessage('Blog page background')),
          contact: Joi.string().uri().required().messages(getImageMessage('Contact page background')),
          donate: Joi.string().uri().required().messages(getImageMessage('Donate page background')),
          volunteer: Joi.string().uri().required().messages(getImageMessage('Volunteer page background')),
        }).optional(),
        aboutUsPage: Joi.object({
          empowerCommunities: Joi.string().uri().required().messages(getImageMessage('Empower Communities image')),
          supportTheNextInitiative: Joi.string()
            .uri()
            .required()
            .messages(getImageMessage('Support The Next Initiative image')),
        }).optional(),
      }).optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    } else {
      next();
    }
  },
};

export default HomePageValidations;
